SELECT posts.id, title, img, content, username, profile_pic FROM posts
JOIN users ON author_id = users.id
WHERE title LIKE $(search)
AND NOT CAST(posts.id AS text)=$(id);