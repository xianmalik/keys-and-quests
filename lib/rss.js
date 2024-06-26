'use server'

import fs from "fs";
import RSS from "rss";

export default async function generateRssFeed(allPosts) {
  const site_url =
    process.env.NODE_ENV === "production"
      ? "https://keysandquests.com"
      : "http://localhost:3000";

  const feedOptions = {
    title: "Keys & Quests | Reviews",
    description: "Welcome to this blog post!",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.jpg`,
    pubDate: new Date(),
    copyright: `All rights reserved! ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  // Add each individual post to the feed.
  allPosts.map((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${site_url}/posts/${post.slug.current}`,
      date: post.date,
    });
  });

  // Write the RSS feed to a file as XML.
  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}