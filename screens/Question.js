import React, { useState } from "react";
// import {
//   StyleSheet,
// } from "react-native";
import { posts } from "../api/landing";
import Post from './Post';

const Question = () => {
  const item = posts[0];
  return <Post item={item} options={{
    miniVersion: false
  }}/>
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "flex-start",
//     justifyContent: "center",
//     padding: 15,
//   },
// });
export default Question;
