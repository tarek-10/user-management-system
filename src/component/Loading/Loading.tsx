import { Watch } from "react-loader-spinner";

export default function Loading() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Watch
          visible={true}
          height="80"
          width="80"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}
