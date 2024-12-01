import React, { FC } from "react";

interface ProfileProps {
  img_src: string;
}

const Profile: FC<ProfileProps> = ({ img_src }) => {
  return (
    <img
      alt="user-profile"
      src={img_src}
      className="w-[35px] h-[35px] rounded-md"
    />
  );
};

export default Profile;
