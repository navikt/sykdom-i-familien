import React from 'react';

interface Props {
    stroke?: string;
    fill?: string;
    size?: string;
}

const CheckBullet = ({ stroke = '#ffffff', fill = '#0067C5', size = '2rem' }: Props) => (
    <svg width={size} height={size} viewBox="0 0 32 32">
        <g fill="none" fillRule="evenodd">
            <circle fill={fill} cx={16} cy={16} r={16} />
            <path
                d="M23.783 11.19l-10.227 9.626a.681.681 0 01-.948-.017L9.2 17.362a.692.692 0 010-.972.678.678 0 01.965 0l2.942 2.967 9.746-9.171a.679.679 0 01.964.031.693.693 0 01-.033.974z"
                fill={stroke}
            />
        </g>
    </svg>
);

export default CheckBullet;
