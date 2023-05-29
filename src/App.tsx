import React, {useCallback, useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    IconButton,
    InputBase,
    LinearProgress,
    styled,
    Tooltip,
    Typography
} from "@mui/material";

const StyledContainer = styled(Container)`
  display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  `;

const StyledBox = styled(Box)`
  display: flex;
  position: relative;
  width: 350px;
  background-color: #fff;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;


const StyledInputBox = styled(Box)`
  display: flex;
  height: 50px;
  border-radius: 20px;
  border: 1px solid #7F8C8D;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  background-color: #fff;
  position: relative;
`;

const StyledLabel = styled(Typography)`
  && {
    font-size: 17px;
    font-weight: 700;
    color: #2C3250;
    margin-bottom: 10px;
    margin-left: 10px;
  }
`;

const StyledLoginBox = styled(Button)`
  display: flex;
  height: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 700;
  color: #2C3250;
  border-radius: 10px;
  border: 1px solid #7F8C8D;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  gap: 10px;
  margin-top: 20px;
  overflow: hidden;
`;

const StyledForm = styled("form")`
    display: flex;
    flex-direction: column;
  width: 100%;
    height: 100%;
`;

const StyledButtonBox = styled(Box)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;


function App() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLogin, setIsLogin] = React.useState(false);
    const [isChecked, setIsChecked] = React.useState(false);
    const myEmail = "myemail@email.com";
    const myPassword = "mypassword";
    const [isShowPassword, setIsShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const [isHover, setIsHover] = React.useState(false);
    const [rememberMe, setRememberMe] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    const handleMouseOver = useCallback(() => {
        setIsHover(true);
    }, []);

    const handleMouseOut = useCallback(() => {
        setIsHover(false);
    }, []);

    const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }, []);

    const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, []);

    useEffect(() => {
        setIsChecked(false);
    }, [email, password]);

    const handleLoading = useCallback((bool:boolean) => {
        setIsLoading(bool);
        handleMouseOut();
    }, [handleMouseOut]);



    const handleLogin = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLoading(true);
        if (email === "" || password === "") {
            setTimeout(() => {
                handleLoading(false);
                emailRef.current?.focus();
                window.alert("Please enter your email and password");
                return;
            }, 500);
            return;
        }
        setTimeout(() => {
            if (email === myEmail && password === myPassword) {
                setIsLogin(true);
                handleProgress();
            } else {
                setIsLogin(false);
                emailRef.current?.focus();
            }
            setIsChecked(true);
            handleLoading(false);
        }, 1000);

    }, [email, handleLoading, password]);

    const handleProgress = useCallback(() => {
        for (let i = 0; i <= 100; i++) {
            setTimeout(() => {
                setProgress(i);
            }, i * 25);
        }
        setTimeout(() => {
            setIsChecked(false);
            setIsLogin(false);
            setProgress(0);
        }, 3500);
    }, []);

    const handleShowPassword = useCallback(() => {
        setIsShowPassword(!isShowPassword);
    }, [isShowPassword]);

    const handleRememberMe = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked);
    }, []);

    return (
        <StyledContainer sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
        }}>
            <StyledBox>
                <StyledForm onSubmit={handleLogin}>
                    <Box>
                        <StyledLabel marginTop={"10px"}>
                            Email
                        </StyledLabel>
                        <StyledInputBox>
                            <InputBase inputRef={emailRef} value={email} type={"email"} onChange={handleEmailChange}
                                       sx={{
                                           color: isLoading ? "#2C3250" : (isChecked ? (isLogin ? "#2C3250" : "#E74C3C") : "#2C3250")
                                       }}
                                       disabled={isLogin || isLoading}
                                       placeholder="your email" fullWidth/>
                            <StyledButtonBox>
                                <img
                                    src={require(isLoading ? "./assets/image/banana-cat.PNG" : (isChecked ? (isLogin ? "./assets/image/bananacat-holding-heart.PNG" : "./assets/image/banana-crying-cat.gif") : "./assets/image/banana-cat.PNG"))}
                                    alt={"banana-cat"} width={"40px"}
                                    height={"40px"}/>
                            </StyledButtonBox>
                        </StyledInputBox>
                    </Box>
                    <Box>
                        <StyledLabel marginTop={"10px"}>
                            Password
                        </StyledLabel>
                        <StyledInputBox>
                            <InputBase inputRef={passwordRef} value={password}
                                       type={isShowPassword ? "text" : "password"}
                                       sx={{
                                           color: isLoading ? "#2C3250" : (isChecked ? (isLogin ? "#2C3250" : "#E74C3C") : "#2C3250")
                                       }}
                                       disabled={isLogin || isLoading}
                                       onChange={handlePasswordChange} placeholder="your password" fullWidth/>
                            <StyledButtonBox>
                                <Tooltip title={isShowPassword ? "Hide password" : "Show password"} placement={"top"}
                                         arrow>
                                    <IconButton onClick={handleShowPassword} disabled={isLogin}>
                                        <img
                                            src={require(isShowPassword ? "./assets/image/hide-password.png" : "./assets/image/show-password.png")}
                                            alt={"pop-cat"} width={"30px"}
                                            height={"30px"}/>
                                    </IconButton>
                                </Tooltip>
                                <img
                                    src={require(isLoading ? "./assets/image/banana-cat.PNG" : (isChecked ? (isLogin ? "./assets/image/bananacat-holding-heart.PNG" : "./assets/image/banana-crying-cat.gif") : "./assets/image/banana-cat.PNG"))}
                                    alt={"banana-cat"} width={"40px"}
                                    height={"40px"}/>
                            </StyledButtonBox>
                        </StyledInputBox>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            flexDirection: "column",
                        }}>
                        {isChecked && !isLogin && !isLoading &&
                            <Typography color={"#E74C3C"} component="span" gutterBottom fontSize={"14px"}
                                        sx={{marginLeft: "10px"}}>
                                Don't make me sad :(
                            </Typography>}
                        <FormControlLabel sx={{
                            marginLeft: "1px",
                            ".css-ahj2mt-MuiTypography-root": {
                                fontSize: "0.8rem",
                                color: rememberMe ? "#2C3250" : "#A6A6A6",
                                "&:hover": {
                                    color: "#2C3250",
                                },
                                transition: "all 0.3s ease-in-out",
                            },
                            ".css-1w1k3o0-MuiButtonBase-root-MuiCheckbox-root": {
                                padding: "5px",
                            },
                        }}
                                          control={<Checkbox value={rememberMe}
                                                             disabled={isLogin || isLoading}
                                                             onChange={handleRememberMe} sx={{color: "#2C3250"}} icon={
                                              <img src={require("./assets/image/apple-cat-standing.png")}
                                                   alt={"apple-cat"} width={"20px"} height={"20px"}/>
                                          } checkedIcon={
                                              <img src={require("./assets/image/apple-cat-running.gif")}
                                                   alt={"apple-cat"} width={"20px"} height={"20px"}/>
                                          }/>}
                                          label="Remember me"/>
                        </Box>
                    </Box>
                    {!isLogin &&
                        <StyledLoginBox onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} type={"submit"}
                                        disabled={isLogin || isLoading}
                                        >
                            {!isLoading && "Login"}
                            {isLoading && "Logging in..."}
                            {isLoading && <img src={require("./assets/image/apple-cat-running.gif")} alt={"login-cat"}
                                               width={"40px"}/>}
                            {!isLoading && <img
                                src={require(isHover ? "./assets/image/apple-cat-running.gif" : "./assets/image/apple-cat-standing.png")}
                                alt={"login-cat"} width={"40px"}/>}
                        </StyledLoginBox>}
                    {!isLoading && isChecked && isLogin && <StyledLoginBox disabled={isLogin || isLoading} type={"submit"}>
                        <LinearProgress sx={{
                            width: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                                        color={"success"} variant={"determinate"} value={progress}/>
                        <img src={require("./assets/image/cat-jump.gif")} alt={"happy-cat"}
                             width={"35px"}/>
                        Welcome!
                        <img src={require("./assets/image/cat-jump.gif")} alt={"happy-cat"}
                             width={"35px"}/>
                    </StyledLoginBox>}
                </StyledForm>
                {isChecked && isLogin && <audio
                    src={require("./assets/sound/happysong.mp3")}
                    autoPlay
                    loop={false}
                >
                </audio>}
                {isChecked && !isLogin && !isLoading && <audio
                    src={require("./assets/sound/bananacat-crying.mp3")}
                    autoPlay>
                </audio>}
            </StyledBox>
        </StyledContainer>
    );
}

export default App;
