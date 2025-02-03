import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const BlockRenderer = ({ blocks }) => {
  return (
    <div className="space-y-4">
      {blocks.map((block) => (
        <div key={block.id}>{renderBlock(block)}</div>
      ))}
    </div>
  );
};

const renderBlock = (block) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={block.id} className="text-base text-gray-800">
          {block.paragraph.rich_text.map((text, index) => (
            <span key={index} className={cn(
              text.annotations.bold && "font-semibold",
              text.annotations.italic && "italic",
              text.annotations.underline && "underline",
              text.annotations.strikethrough && "line-through",
              text.annotations.code && "font-mono",
            )}>{text.plain_text}</span>
          ))}
        </p>
      );

    case "heading_1":
      return (
        <h1 key={block.id} className="text-3xl font-bold text-gray-900">
          {block.heading_1.text.map((text, index) => (
            <span key={index}>{text.plain_text}</span>
          ))}
        </h1>
      );

    case "heading_2":
      return (
        <h2 key={block.id} className="text-2xl font-semibold text-gray-800">
          {block.heading_2.text.map((text, index) => (
            <span key={index}>{text.plain_text}</span>
          ))}
        </h2>
      );

    case "heading_3":
      return (
        <h3 key={block.id} className="text-xl font-medium text-gray-700">
          {block.heading_3.text.map((text, index) => (
            <span key={index}>{text.plain_text}</span>
          ))}
        </h3>
      );

    case "image":
      return (
        <div key={block.id} className="relative my-3 px-8">
          {block.image.type === "file" && (
            <Image
              width={900}
              height={600}
              src={block.image.file.url}
              alt={block.image.caption.map((caption, idx) => caption.plain_text).join(" ")}
              className="aspect-[3:2] object-cover mx-auto mt-8 mb-2 border-2 shadow-lg max-w-full"
            />
          )}
          {block.image.caption && (
            <p className="mt-2 text-xs text-center text-gray-600">
              {block.image.caption.map((caption, idx) => caption.plain_text).join(" ")}
            </p>
          )}
        </div>
      );

    case "bulleted_list_item":
      return (
        <ul key={block.id} className="list-disc pl-6">
          <li className="text-gray-800">
            {block.bulleted_list_item.text.map((text, index) => (
              <span key={index}>{text.plain_text}</span>
            ))}
          </li>
        </ul>
      );

    case "numbered_list_item":
      return (
        <ol key={block.id} className="list-decimal pl-6">
          <li className="text-gray-800">
            {block.numbered_list_item.text.map((text, index) => (
              <span key={index}>{text.plain_text}</span>
            ))}
          </li>
        </ol>
      );

    case "quote":
      return (
        <blockquote key={block.id} className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
          {block.quote.text.map((text, index) => (
            <span key={index}>{text.plain_text}</span>
          ))}
        </blockquote>
      );

    case "code":
      return (
        <pre key={block.id} className="bg-gray-100 p-4 rounded-md">
          <code className="text-sm text-gray-800">
            {block.code.text.map((text, index) => text.plain_text).join(" ")}
          </code>
        </pre>
      );

    case "callout":
      return (
        <div key={block.id} className="flex items-start p-4 bg-yellow-100 rounded-md shadow-md">
          <span className="text-2xl mr-2">{block.callout.icon.emoji}</span>
          <div>
            {block.callout.text.map((text, index) => (
              <span key={index} className="text-gray-700">
                {text.plain_text}
              </span>
            ))}
          </div>
        </div>
      );

    case "divider":
      return <hr key={block.id} className="border-t-2 border-gray-300 my-4" />;

    case "embed":
      return (
        <div key={block.id} className="my-4">
          <iframe
            src={block.embed.url}
            width="600"
            height="400"
            className="w-full h-96 rounded-md shadow-md"
          />
        </div>
      );

    case "table":
      return (
        <table key={block.id} className="min-w-full table-auto">
          {/* Render table rows and columns if needed */}
        </table>
      );

    case "to_do":
      return (
        <div key={block.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={block.to_do.checked}
            disabled
            className="text-blue-500"
          />
          {block.to_do.text.map((text, index) => (
            <span key={index} className="text-gray-800">
              {text.plain_text}
            </span>
          ))}
        </div>
      );

    default:
      return <div key={block.id} className="text-red-500">Unsupported block type: {block.type}</div>;
  }
};

export default BlockRenderer;
