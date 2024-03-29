import styled from "@emotion/styled";

export const LoaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-grow: 1;
`;

export const LoaderAnimation = styled.div`
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: orange;
  background: linear-gradient(to right, orange 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  animation: load3 1.4s infinite linear;

  transform: translateZ(0);

  &:before {
    width: 50%;
    height: 50%;
    background: orange;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  &:after {
    background: #fff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
