import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
} from "@storyblok/react";

export const loader = async (params: { slug: string }) => {
  console.log(process.env.STORYBLOK_API_TOKEN);
  const slug = params.slug ?? "home";

  let { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, { version: "draft" });

  return json(data?.story);
};

export default function Page() {
  let story = useLoaderData();

  story = useStoryblokState(story);

  return <StoryblokComponent blok={story.content} />;
}