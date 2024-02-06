import React from "react";
import Image from "next/image";
import useExtractColor from "@/actions/useExtractColor";

let url = "";

export default function Events(props: any) {
  const event = props.event;
  event.images.map((i: any) => {
    if (i.ratio == "3_2" && i.width == 640) {
      return (url = i.url);
    }
  });

  const divStyle = {
    backgroundImage: "url(" + url + ")",
  };
  const { lighterColor } = useExtractColor(url);
  const divStyleBgImage = {
    backgroundColor: `${lighterColor}`,
  };

  return (
    <div
      className=" relative overflow-hidden rounded-lg pb-7 justify-items-stretch justify-evenly flex flex-col sm:group-even:ml-[18rem]"
      style={divStyleBgImage}
    >
      {/* <>
        <Image width={500} height={40} src={url} alt={event.name} />
      </> */}
      <div
        className="bg-to bg-center bg-cover bg-no-repeat w-full h-48  sm:max-w"
        style={divStyle}
      >
        <h2 className=" text-3xl">{event.name}</h2>
      </div>
      <div className=" whitespace-pre-line w-6/12">
        <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
          {event.promoter?.name || <br />}
        </p>
        <a href={props.event.url}>Event link</a>
      </div>
    </div>
  );
}
