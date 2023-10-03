import React from 'react';
import { NextPage } from 'next';

interface Iprops {
	text: string;
}

const NoResults: NextPage<Iprops> = ({ text }) => {
	return <div>NoResults</div>;
};

export default NoResults;
