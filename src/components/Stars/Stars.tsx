import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface StarsProps {
    rating: number;
}

const Stars = ({ rating }: StarsProps) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={i} />);
    }

    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" />);
    }

    while (stars.length < 10) {
        stars.push(<FaRegStar key={stars.length} />);
    }

    return <div>{stars}</div>;
};

export { Stars };
