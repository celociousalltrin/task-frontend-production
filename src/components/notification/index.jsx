import React, { useEffect, useState } from "react";

import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import AppNoDataFound from "../app-no-data-found";
import { BulletList } from "react-content-loader";
import {
  clearNotifications,
  clearSingleNotification,
  getNotifications,
  readNotification,
} from "../../services/methods";
import { responseMessage } from "../../utils/response-message";
import { customTimeAgo } from "../../utils/common-function";
import { AiOutlineClose } from "react-icons/ai";

const Notificationpage = () => {
  const [notifyList, setnotifyList] = useState([]);

  const [isApiExecuted, setIsApiExecuted] = useState(false);

  const getList = async () => {
    try {
      const response = await getNotifications();
      setnotifyList(response.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:21 ~ getList ~ err:", err);
    } finally {
      setIsApiExecuted(true);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const notificationMessage = (type, name, date) => {
    if (type === 2) {
      return `User named ${name} has been Logged in on ${customTimeAgo(date)}`;
    } else {
      return `User named ${name} has been Created Account  on ${customTimeAgo(
        date
      )}`;
    }
  };

  const handleCloseNotification = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const response = await clearSingleNotification(id);
      setnotifyList((prev) => prev.filter((x) => x._id !== id));
      responseMessage(response.data.code);
    } catch (err) {
      responseMessage(err.data.code);
      console.log(
        "🚀 ~ file: index.jsx:62 ~ handleCloseNotification ~ err:",
        err
      );
    }
  };

  const readNotify = (input, id) => {
    return input.map((obj) => {
      if (obj._id === id) {
        return { ...obj, is_read: true };
      } else {
        return obj;
      }
    });
  };

  const handlereadNotification = async (id) => {
    try {
      const response = await readNotification(id);
      setnotifyList((prev) => readNotify(prev, id));
      responseMessage(response.data.code);
    } catch (err) {
      responseMessage(err.data.code);
      console.log(
        "🚀 ~ file: index.jsx:53 ~ handlereadNotification ~ err:",
        err
      );
    }
  };

  const handleClearAllNotification = async () => {
    try {
      const response = await clearNotifications({
        ids: notifyList.map((o) => o._id),
      });
      setnotifyList([]);
      localStorage.setItem("count", 0);
      responseMessage(response.data.code);
    } catch (err) {
      responseMessage(err.data.code);
      console.log(
        "🚀 ~ file: index.jsx:93 ~ handleClearAllNotification ~ err:",
        err
      );
    }
  };

  return (
    <div className="container">
      {isApiExecuted ? (
        <>
          {notifyList.length > 0 ? (
            <>
              {notifyList.length > 0 && (
                <button
                  className="d-flex ms-auto btn btn-danger btn-sm mb-4"
                  type="button"
                  onClick={handleClearAllNotification}
                >
                  Clear All notification
                </button>
              )}
              {notifyList.map((obj) => (
                <div
                  key={`ntfy_lst${obj._id}`}
                  className="d-flex mb-4 pb-3 rounded notify-container position-relative"
                  style={{
                    backgroundColor: obj.is_read ? "" : "rgb(190, 206, 231)",
                  }}
                  onClick={() => handlereadNotification(obj._id)}
                >
                  <div>
                    <img
                      src={obj.userData.user_image.secure_url}
                      alt="profile_image"
                      width="50px"
                      height="50px"
                      className="notification_profile--img "
                    />
                  </div>
                  <div>
                    <div className="d-flex mt-2 ms-2">
                      <p className="fw-bold mb-0">{obj.userData.name}</p>
                    </div>
                    <div className="ms-2">
                      {notificationMessage(
                        obj.notify_type,
                        obj.userData.name,
                        obj.createdAt
                      )}
                    </div>
                  </div>
                  <AiOutlineClose
                    onClick={(e) => handleCloseNotification(e, obj._id)}
                    size={20}
                    className="notification-close__btn"
                  />
                </div>
              ))}
            </>
          ) : (
            <AppNoDataFound content={"No Notifcation is Present"} />
          )}
        </>
      ) : (
        <>
          <BulletList />
          <BulletList />
        </>
      )}
    </div>
  );
};

export default Notificationpage;
