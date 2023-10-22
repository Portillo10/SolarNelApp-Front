import { useEffect, useState } from "react";

function Chart({ data, colors, labels, type }) {
  const max = Math.max(...data);

  return (
    <>
      {type == "bar" ? (
        <div className="w-100 flex-row flex justify-center">
          <section className="grid grid-cols-5 justify-center gap-x-3">
            {data.map((element, i) => (
              <div key={i} className="flex flex-col justify-end ">
                <p className="text-center">{element}</p>
                <span
                  style={{
                    height: (110 / max) * element,
                    backgroundColor: colors[i],
                    borderRadius: "5px 5px 0px 0px",
                  }}
                ></span>
                <p className="text-sm text-center">{labels[i]}</p>
              </div>
            ))}
          </section>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Chart;
