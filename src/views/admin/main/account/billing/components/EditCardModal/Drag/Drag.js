import { Icon } from '@chakra-ui/react';
import { hostNameStorage } from 'Helpers/App';
import * as React from 'react';
import { useState } from 'react';
import { MdReorder } from 'react-icons/md';
import { arrayMove, List } from 'react-movable';

export const DraggableList = ({ socials, setsocials, openEditLink }) => {
    //   const [socials, setsocials] = useState([
    //     'Item 1',
    //     'Item 2',
    //     'Item 3',
    //     'Item 4',
    //     'Item 5',
    //     'Item 6'
    //   ]);

    return (
        <div
            style={{
                width: '100%'
            }}
        >
            <List
                lockVertically
                values={socials}
                onChange={({ oldIndex, newIndex }) =>
                    setsocials(arrayMove(socials, oldIndex, newIndex))
                }
                renderList={({ children, props, isDragged }) => (
                    <ul
                        {...props}
                        style={{ padding: 0, cursor: isDragged ? 'grabbing' : undefined }}
                    >
                        {children}
                    </ul>
                )}
                renderItem={({ value, props, isDragged, isSelected, index }) => (
                    <li
                        {...props}
                        style={{
                            ...props.style,
                            padding: '0',
                            margin: '0.5em 0em',
                            listStyleType: 'none',
                            // cursor: isDragged ? 'grabbing' : 'grab',
                            //   border: '2px solid #CCC',
                            color: '#333',
                            borderRadius: '20px',
                            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                            backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF',
                            boxShadow: '4px 4px 10px grey',
                            overflow: 'hidden'
                        }}
                    >
                        <Icon
                            data-movable-handle
                            className='draggable-social-hnd'
                            style={{
                                cursor: isDragged ? 'grabbing' : 'grab',
                                float: 'left'
                            }}
                            tabIndex={-1}
                            as={MdReorder} color={'black'} w='30px' h='30px'
                        />
                        <div 
                        className='draggable-social-img'
                        style={{
                            borderRadius: '30%',
                            float: 'left',
                            boxShadow: '4px 4px 10px grey',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100%',
                            backgroundImage: value.imgUrl.blobUrl ? `url(${value.imgUrl.blobUrl})` : `url(${hostNameStorage}/${value.imgUrl})`,
                            cursor: 'grab',
                        }}></div>
                        <div style={{
                            float: 'left',
                            paddingTop: '5%'
                        }}>{value.title}</div>
                        <div 
                        className='draggable-social-edit'
                        style={{
                            borderRadius: '30%',
                            float: 'right',
                            boxShadow: '4px 4px 10px grey',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: 'url(/static/media/edit.svg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: '60%',
                            cursor:'pointer'
                        }}
                            onClick={() => { openEditLink(index, value) }}
                        >
                        </div>
                    </li>
                )}
            />
        </div>
    );
};
