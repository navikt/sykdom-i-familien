import React from 'react';

interface Props {
    stroke?: string;
    fill?: string;
    size?: string;
}

/**
 * blue: 0067C5
 * reverse bullet: 3E3832
 * dark blue: 32414F
 */
const CheckBullet = ({ stroke = '#fff', fill = '#32414F', size = '2rem' }: Props) => (
    <svg width={size} height={size} viewBox="0 0 32 32" focusable="false">
        <g fill="none" fillRule="evenodd">
            <circle cx={16} cy={16} r={16} fill={fill} />
            <g stroke={stroke} strokeLinecap="round" strokeWidth={3}>
                <path d="M9.5 17.5l4 4M13.5 21.5l10-10" />
            </g>
        </g>
    </svg>
);

export default CheckBullet;
