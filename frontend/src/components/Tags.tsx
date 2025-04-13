import React, { useCallback, useState } from 'react';
import { Flex, Input, Tag } from 'antd';
import { Station } from '../types';
import './Tags.style.less';

type TagsProps = {
    tags: string[];
    onChange: (tags: Station['tags']) => void;
}
export default function Tags({ tags, onChange }: TagsProps) {
    const [innerTags, setInnerTags] = useState<string[]>(tags);
    const [inputVisible, setInputVisible] = useState(false);
    const handleAddTag = useCallback(() => setInputVisible(true), []);
    const handleBlur = () => setInputVisible(false);
    const handleTagDelete = (removedTag: string) => {
        const newTags = innerTags.filter((tag) => tag !== removedTag);
        setInnerTags(newTags);
        onChange(newTags);
    };
    const handleEditTag = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const { value } = (event.target as HTMLInputElement);
            const newTags = [...innerTags, value];
            setInnerTags(newTags);
            onChange(newTags);
        }

        if (['Enter', 'Escape'].includes(event.key)) {
            setInputVisible(false);
        }
    }, []);

    return (<Flex gap="4px 0" wrap>
        {innerTags.map(tag => (<Tag
            key={tag}
            closable
            onClose={() => handleTagDelete(tag)}
        >
            {tag}
        </Tag>))}
        {inputVisible
            ? <Input
                className="tags__tag-input"
                size="small"
                autoFocus
                onBlur={handleBlur}
                onKeyDown={handleEditTag}
            />
            : <Tag className="tags__add-tag" onClick={handleAddTag}>Add tag</Tag>}
    </Flex>);
}