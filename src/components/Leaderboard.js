import React, { useState, useEffect } from 'react';
import { Card, Table, Spinner } from 'react-bootstrap';
import { db } from '../config/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const allAdmins = ['Aydın', 'Azra', 'Melih', 'Nisa', 'Taha', 'Yağız', 'Yankı', 'Yunus', 'Furkan', 'Gencer', 'Nil', 'Nehir'];
        const q = query(collection(db, 'activities'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const points = allAdmins.reduce((acc, admin) => {
                acc[admin] = 0;
                return acc;
            }, {});

            querySnapshot.forEach((doc) => {
                const { admin, points: pts } = doc.data();
                if (points.hasOwnProperty(admin)) {
                    points[admin] += pts;
                }
            });

            const sortedScores = Object.entries(points)
                .map(([name, score]) => ({ name, score }))
                .sort((a, b) => b.score - a.score);

            setScores(sortedScores);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const getRowClass = (index) => {
        if (index === 0) return 'table-first-place';
        if (index === 1) return 'table-second-place';
        if (index === 2) return 'table-third-place';
        return '';
    };

    if (loading) {
        return ( <
            Card className = "card-custom mb-4" >
            <
            Card.Header as = "h4" > PUAN DURUMU < /Card.Header> <
            Card.Body className = "text-center" >
            <
            Spinner animation = "border"
            variant = "danger" / >
            <
            /Card.Body> <
            /Card>
        );
    }

    return ( <
        Card className = "card-custom mb-4" >
        <
        Card.Header as = "h4" > PUAN DURUMU < /Card.Header> <
        Card.Body >
        <
        Table hover variant = "dark"
        className = "table-custom" >
        <
        thead >
        <
        tr >
        <
        th > # < /th> <
        th > Admin < /th> <
        th > Puan < /th> <
        /tr> <
        /thead> <
        tbody > {
            scores.map((admin, index) => ( <
                tr key = { admin.name }
                className = { getRowClass(index) } >
                <
                td > { index + 1 } < /td> <
                td > { admin.name } < /td> <
                td > < strong > { admin.score } < /strong></td >
                <
                /tr>
            ))
        } <
        /tbody> <
        /Table> <
        /Card.Body> <
        /Card>
    );
};

export default Leaderboard;