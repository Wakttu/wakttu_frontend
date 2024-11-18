import { useState } from "react";

const MyEmoticonList = () => {
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      {isLoading ? (
        ''
      ) : (
        <div style={{ padding: '3rem' }}>
          준비중
        </div>
      )}
    </>
  );
};

export default MyEmoticonList;