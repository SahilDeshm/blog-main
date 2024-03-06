import React, { useEffect, useState } from "react";
import Post from "../Post";

function Index() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post')
            .then(response => response.json())
            .then(postsData => {
                console.log(postsData); // Ensure the data is logged correctly
                setPosts(postsData);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post key={post._id} {...post} />
            ))}
        </>
    );
}

export default Index;
