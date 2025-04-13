import { Pool } from 'pg';
import { Station, Tag } from './models';
import * as process from 'node:process';

const connectionString = process.env.CONNECTION_STRING;
if (!connectionString) {
    throw new Error('Missing database connection string');
}

let pool: Pool = new Pool({ connectionString });

type GetStations = Station & {
    tags: string;
};
export async function getStation() {
    const result = await pool.query<GetStations>(`
    SELECT id, name, tags from Station left join (
        SELECT
            stationId,
            array_to_string(array_agg(Tag.title), ',') as tags
        FROM Tag
        GROUP BY stationId) s
    ON s.stationId = Station.id
    ORDER BY name DESC;`);

    return result.rows;
}

export async function saveTags(stationId: Station['id'], tags: Array<Tag>): Promise<void> {
    const stationTags = await pool.query(`SELECT title FROM Tag WHERE stationId = $1`, [stationId]);
    const stationTagsList = stationTags.rows.map(({ title }) => title);
    const tagsForRemove = stationTagsList.filter((tag) => !tags.includes(tag));
    const tagsForAdding = tags.filter((tag) => !stationTagsList.includes(tag));

    if (tagsForAdding.length > 0) {
        await pool.query(`INSERT INTO Tag VALUES ($1, unnest(array[$2]))`, [stationId, tagsForAdding.join(',')]);
    }

    if (tagsForRemove.length > 0) {
        await pool.query(`DELETE FROM Tag WHERE stationId = $1 AND title = ANY(array[$2])`, [stationId, tagsForRemove.join(',')]);
    }
}