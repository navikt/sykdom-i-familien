import React from 'react';

import './externalLinkIcon.less';

interface Props {}

const ExternalLinkIcon: React.FunctionComponent<Props> = () => (
    <svg viewBox="0 0 24 24" focusable="false" role="presentation" aria-hidden="true" className="extenalLinkIcon">
        <g strokeWidth={10} fill="#0067C5" fillRule="evenodd">
            <path d="M22.522 16.57a.478.478 0 01.956 0v2.763a4.145 4.145 0 01-4.145 4.145H4.667a4.145 4.145 0 01-4.145-4.145V4.667A4.145 4.145 0 014.667.522h2.805a.478.478 0 110 .956H4.667a3.188 3.188 0 00-3.189 3.189v14.666a3.188 3.188 0 003.189 3.189h14.666a3.188 3.188 0 003.189-3.189V16.57z" />
            <path d="M10.138 14.538a.478.478 0 11-.676-.676l13.2-13.2a.478.478 0 11.676.676l-13.2 13.2z" />
            <path d="M22.522 1.478h-8.306a.478.478 0 110-.956h9.262v9.413a.478.478 0 11-.956 0V1.478z" />
        </g>
    </svg>
);

export default ExternalLinkIcon;
