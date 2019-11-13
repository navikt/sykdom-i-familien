import React from 'react';

interface Props {
    stroke?: string;
    fill?: string;
    size?: string;
}

/**
 * blue: 0067C5
 */
const CheckBullet = ({ stroke = '#3E3832', fill = '#ffffff', size = '2rem' }: Props) => (
    <svg width={size} height={size} viewBox="0 0 32 32">
        <g fill="none" fillRule="evenodd">
            <circle cx={16} cy={16} r={16} fill={fill} />
            <g stroke={stroke} strokeLinecap="round" strokeWidth={3}>
                <path d="M9.5 17.5l4 4M13.5 21.5l10-10" />
            </g>
        </g>
    </svg>
);

export default CheckBullet;
