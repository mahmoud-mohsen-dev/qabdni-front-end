interface ProfileImageType {
  url: string;
}

function ProfileImage({ url }: ProfileImageType) {
  return (
    <div className={`me-[-15px] h-10 w-10 rounded-full border-2 border-indigo/ultralight bg-other/gray&red-light`}>
      {url && <img src={url} alt="employee profile" />}
    </div>
  );
}

export default ProfileImage;
