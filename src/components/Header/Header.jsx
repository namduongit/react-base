import { Avatar, AppBar, Container, Typography } from "@mui/material";
import logo from '../../assets/logo.png';
import giaohanh from '../../assets/giaohang.png';
import StorefrontIcon from '@mui/icons-material/Storefront';

import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { database, auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { Link } from "react-router-dom";
import { Link as LinkMaterial } from "@mui/material";


import Role from "../Role/Role";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const [roleUser, setRoleUser] = useState(null);

  // Hàm đăng nhập với Google và tạo user nếu chưa có
  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        

        const user = result.user;

        if (user) {
          setCurrentUser(user);
          // Tạo tham chiếu 
          const userRef = doc(database, "users", user.uid);
          // Truy vấn
          const userSnap = await getDoc(userRef);
          // Nếu chưa có dữ liệu thì thực hàm này
          if (userSnap.exists()) {
            const data = userSnap.data();
            console.log(data)
            setRoleUser(data.role);
            console.log("User đã tồn tại. Role:", data.role);
          }

          // Nếu đã có dữ liệu
          else {
            await setDoc(userRef, {
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
              role: "user"
            });

            setRoleUser("user");
            console.log("Tạo user mới lần đầu");
          }
        }
      })
      .catch((error) => {
        console.log('Lỗi khi đăng nhập:', error);
      });
  };

  
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        setRoleUser(null);
        alert('Đăng xuất thành công');
      })
      .catch(() => {
        console.log('Lỗi khi đăng xuất');
      })
  }

  // Kiểm tra nếu user đã đăng nhập trước đó (duy trì session)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userSnap = await getDoc(doc(database, "users", user.uid));
        if (userSnap.exists()) {
          setRoleUser(userSnap.data().role);
        }
      } else {
        setCurrentUser(null);
        setRoleUser(null);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <>

      <AppBar>

        <Container sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0"
        }}>

          <LinkMaterial component={Link}  to={"/"}>
            <img src={logo} alt="" width="200px" />
          </LinkMaterial>

          <Typography variant="h4" sx={{ color: "yellow" }}>1900.1060</Typography>
          <img src={giaohanh} alt="" width="200px" />

          {currentUser ? (
            <Avatar src={currentUser.photoURL} sx={{ cursor: "pointer" }} onClick={logOut} />
          ) : (
            <Avatar onClick={loginWithGoogle} sx={{ cursor: "pointer" }} />
          )}

          <StorefrontIcon />

        </Container>


      </AppBar>

      {roleUser && <Role bienTruyenVao={roleUser} />}

    </>

  );
};

export default Header;
