import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

const Update = ({ setOpenUpdate, user }) => {
  let day;
  if (user.dob) {
    const date = new Date(user.dob.slice(0, 10));
    day = String(date.getDate() + 1).padStart(2, "0");
  }

  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    country: user.country,
    dob: user.dob ? user.dob.slice(0, 8) + day : "",
  });

  const upload = async (file) => {
    // console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    //TODO: find a better way to get image URL

    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, profilePic: profileUrl, coverPic: coverUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className="update">
      <div className="container">
        <div className="headWrap">
          <div className="head">
            <h2>Update Your Profile</h2>
          </div>
          <div className="close" onClick={() => setOpenUpdate(false)}>
            <CloseIcon />
          </div>
        </div>
        <div className="wrapper">
          <form>
            <div className="files">
              <label htmlFor="cover">
                <span>Cover Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      cover
                        ? URL.createObjectURL(cover)
                        : "/upload/" + user.coverPic
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="cover"
                style={{ display: "none" }}
                onChange={(e) => {
                  console.log("e,target.files ", e.target.files);
                  setCover(e.target.files[0]);
                }}
              />
              <label htmlFor="profile">
                <span>Profile Picture</span>
                <div className="imgContainer">
                  <img
                    src={
                      profile
                        ? URL.createObjectURL(profile)
                        : "/upload/" + user.profilePic
                    }
                    alt=""
                  />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
              <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
            <label>Email</label>
            <input
              type="text"
              value={texts.email}
              name="email"
              onChange={handleChange}
            />
            <label>Password</label>
            <input
              type="text"
              value={texts.password}
              name="password"
              onChange={handleChange}
            />
            <label>Name</label>
            <input
              type="text"
              value={texts.name}
              name="name"
              onChange={handleChange}
            />
            <label>City</label>
            <input
              type="text"
              name="city"
              value={texts.city}
              onChange={handleChange}
            />
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={texts.country}
              onChange={handleChange}
            />
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={texts.dob}
              onChange={handleChange}
            />
          </form>
        </div>
        <div className="bottom">
          <button onClick={handleClick}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Update;
