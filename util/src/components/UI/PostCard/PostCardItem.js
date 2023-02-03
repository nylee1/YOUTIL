import { useState, useEffect } from "react";
import classes from "./PostCardItem.module.css";
import TagDataList from "../Tag/TagDataList";
import { IconButton, createTheme, ThemeProvider, Avatar } from "@mui/material";
import bookmarkIconFlat from "../../../img/BookmarkIconFlat.svg";
import bookmarkIconFill from "../../../img/BookmarkIconFill.svg";
import likeIconFlat from "../../../img/LikeIconFlat.svg";
import likeIconFill from "../../../img/LikeIconFill.svg";
import PhotoCameraIcon from "../../../img/photoCameraIcon_gray.png";
import { getPostTag } from "../../../api/Post/getPostTag";
import { putLikeToggle } from "../../../api/Post/putLikeToggle";
import { putBookmarkToggle } from "../../../api/Post/putBookmarkToggle";

const avatarTheme = createTheme({
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: { marginRight: 4 },
      },
    },
  },
});

const PostCardItem = (props) => {
  const [tagList, setTagList] = useState(null);
  const [isBookmark, setIsBookmark] = useState(props.bookmarkStatus);
  const [isLike, setIsLike] = useState(props.likeStatus);

  useEffect(() => {
    getPostTag(props.id).then((res) => {
      setTagList(() => res);
    });
  }, []);

  const imgErrorHandler = (event) => {
    event.target.src = PhotoCameraIcon;
  };

  const bookmarkClickHandler = () => {
    putBookmarkToggle(props.id).then((res) => {
      if (res === 200) {
        setIsBookmark((prevState) => !prevState);
      }
    });
  };

  const likeClickHandler = () => {
    // 지금 유저 아이디가 아니라 포스트 아이디를 넣어줘야 함
    putLikeToggle(props.id).then((res) => {
      if (res === 200) {
        setIsLike((prevState) => !prevState);
      }
    });
  };

  const tagOnClickHandler = (event) => {
    console.log(event.currentTarget.innerText);
  };

  return (
    <li>
      <div className={classes.postcarditem}>
        <div className={classes[`card-text`]}>
          <div className={classes.title}>{props.title}</div>
          <div className={classes.contents}>{props.content}</div>
          <div className={classes.tags}>
            <TagDataList tagList={tagList} onClick={tagOnClickHandler} />
          </div>
          <div className={classes[`icon-user`]}>
            <div className={classes.iconbutton}>
              <IconButton
                onClick={bookmarkClickHandler}
                style={{
                  paddingTop: 0,
                  paddingRight: 0,
                  paddingBottom: 0,
                  paddingLeft: 0,
                  marginRight: 10,
                }}
              >
                <img src={isBookmark ? bookmarkIconFill : bookmarkIconFlat} />
              </IconButton>
              <IconButton
                onClick={likeClickHandler}
                style={{
                  paddingTop: 0,
                  paddingRight: 0,
                  paddingBottom: 0,
                  paddingLeft: 0,
                }}
              >
                <img src={isLike ? likeIconFill : likeIconFlat} />
              </IconButton>
              <div className={classes.likecount}>{props.likeCount}</div>
            </div>
            <div className={classes.user}>
              <ThemeProvider theme={avatarTheme}>
                <Avatar
                  src={props.profileImg}
                  sx={{
                    width: 24,
                    height: 24,
                    border: "1px solid lightgray",
                    objectFit: "scale-down",
                  }}
                />
              </ThemeProvider>
              <div className={classes.nickname}>{props.nickname}</div>
              <div className={classes.date}>{props.createdDate}</div>
            </div>
          </div>
        </div>
        <div className={classes[`card-image`]}>
          <img src={props.thumbnail} onError={imgErrorHandler} />
        </div>
      </div>
    </li>
  );
};

export default PostCardItem;
