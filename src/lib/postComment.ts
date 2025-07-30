export async function postComment(payload: {
    articleId: string;
    author: string;
    content: string;
    parentId?: string
}) {
    const res = await fetch("/api/comments", {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(
            payload
        )
    })
    if(!res.ok) throw new Error("Failed to post comment");
    return res.json()
}