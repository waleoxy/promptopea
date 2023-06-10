"use client";

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditPrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    useEffect(() => {
        const getPromptDetails = async () => {
            console.log('pdata');
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            console.log('p', data);
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };

        if (promptId) getPromptDetails();
        console.log("no pro");
    }, [promptId]);


    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) alert("Prompt id not found");

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );
};

export default EditPrompt;
