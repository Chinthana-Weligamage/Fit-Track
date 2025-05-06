import type { Metadata } from "@/types/CardTypes";
import { FC } from "react";

const MetadataBadge: FC<{ metadata: Metadata }> = ({ metadata }) => {
  return (
    <div className="flex flex-row items-center p-3 gap-3">
      <div className="h-10 w-10 rounded-full overflow-hidden">
        <img
          src={metadata.authorImage}
          alt=""
          onError={(e) =>
            (e.currentTarget.src =
              "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg")
          }
        />
      </div>
      <div className="flex gap-1 flex-col justify-around items-start">
        <div className="font-bold">{metadata.authorName}</div>
        <div className="text-xs text-zinc-400">{`Published on: ${metadata.publishedDate}`}</div>
      </div>
    </div>
  );
};

export default MetadataBadge;
