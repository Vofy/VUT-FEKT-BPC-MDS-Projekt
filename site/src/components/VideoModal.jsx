import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Container,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { videoModalDataState } from "./../state/atoms";
import VideoJS from "./VideoJS";
import React from "react";

export default function VideoModal(props) {
  const [data, setData] = useRecoilState(videoModalDataState);
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    responsive: true,
    controls: true,
    autoplay: true,
    fluid: true,
    sources: [
      {
        src: "https://mds.vofy.tech/hls/" + data.uuid + ".m3u8",
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:y
    player.on("waiting", () => {
      //videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      //videojs.log("player will dispose");
    });
  };

  return (
    <Modal {...props} size={"full"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container maxWidth={"unset"} maxHeight={"100vh"} >
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

VideoModal.propTypes = {
  isVideoModalOpen: PropTypes.bool,
  onVideoModalClose: PropTypes.func,
};
