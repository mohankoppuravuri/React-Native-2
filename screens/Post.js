import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from "react-native";
import {
  TouchableWithoutFeedback,
  LongPressGestureHandler,
  State,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { Avatar } from "react-native-elements";
import {
  Feather,
  EvilIcons,
  Ionicons,
  SimpleLineIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";

const AvatarImage = ({ uri, name, nameTitle, nameSubTitle }) => {
  return (
    <View style={styles.avatarContainer}>
      <Avatar
        size={32}
        rounded
        source={{
          uri: uri,
        }}
      />
      <View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name} </Text>
          <Text style={styles.nameTitle}>{nameTitle}</Text>
        </View>
        <Text style={styles.nameSubTitle}>{nameSubTitle}</Text>
      </View>
    </View>
  );
};

const ReadMore = ({ data, miniVersion }) => {
  const [show_more, setShowMore] = useState(data.length > 100);
  if (!miniVersion) return <Text>{data}</Text>;
  if (show_more) {
    return (
      <React.Fragment>
        <Text>{data.substring(0, 100)}</Text>
        <Text
          style={styles.showMore}
          onPress={() => {
            setShowMore(false);
          }}
        >
          ...show More
        </Text>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Text>{data}</Text>
      <Text
        style={styles.showMore}
        onPress={() => {
          setShowMore(true);
        }}
      >
        ...show Less
      </Text>
    </React.Fragment>
  );
};

const CommentList = ({ data }) => {
  return (
    <View style={styles.commentsContainer}>
      {data.map((comment, index) => {
        return (
          <View key={index} style={styles.commentContainer}>
            <AvatarImage
              uri={comment.author.image}
              name={comment.author.name}
              nameTitle="Asked a question"
              nameSubTitle="Diagnosed recently"
            />
            <Text>{comment.message}</Text>
          </View>
        );
      })}
      <View style={styles.commentBox}>
        <TextInput />
        <Feather name="send" style={styles.icon} size={24} color="black" />
      </View>
    </View>
  );
};

const EmojiSelector = ({ openEmoji, translation, setSelected, onPress }) => {
  if (!openEmoji) {
    return null;
  }
  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 80,
        borderWidth: 1,
        borderRadius: 10,
        transform: [{ translateY: translation }],
        zIndex: 1,
        backgroundColor: "white",
        padding: 8,
      }}
    >
      <TouchableWithoutFeedback
        onPress={onPress}
        style={styles.openEmojiContainer}
      >
        <TouchableWithoutFeedback
          onPress={() => setSelected("like")}
          style={styles.iconContainer}
        >
          <SimpleLineIcons
            style={styles.icon}
            size={20}
            name="like"
            color="orange"
          />
          <Text>Like</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={styles.iconContainer}
          onPress={() => setSelected("emoji-happy")}
        >
          <Entypo
            style={styles.icon}
            name="emoji-happy"
            size={24}
            color="orange"
          />
          <Text>Haha</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={styles.iconContainer}
          onPress={() => setSelected("sad-cry")}
        >
          <FontAwesome5
            style={styles.icon}
            name="sad-cry"
            size={24}
            color="orange"
          />
          <Text>Sad</Text>
        </TouchableWithoutFeedback>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const PostFooter = ({ item }) => {
  const translation = useRef(new Animated.Value(1)).current;
  const [openEmoji, setOpenEmoji] = useState(false);
  const [emojiSelected, setSelected] = useState("like");

  const getEmojiSelector = () => {
    if (emojiSelected == "like")
      return (
        <SimpleLineIcons
          style={styles.icon}
          size={20}
          name="like"
          color="black"
        />
      );
    else if (emojiSelected == "sad-cry")
      return (
        <FontAwesome5
          style={styles.icon}
          name="sad-cry"
          size={24}
          color="black"
        />
      );
    return (
      <Entypo style={styles.icon} name="emoji-happy" size={24} color="black" />
    );
  };
  return (
    <View style={styles.postFooter}>
      <EmojiSelector
        onPress={() => setOpenEmoji(false)}
        openEmoji={openEmoji}
        translation={translation}
        setSelected={setSelected}
      />
      <View style={styles.iconContainer}>
        <LongPressGestureHandler
          minDurationMs={500}
          maxDist={200}
          onHandlerStateChange={({ nativeEvent }) => {
            const { x, y } = nativeEvent;
            if (y >= -73 && y < -21) {
              if (x < 40 && x >= -22) {
                setSelected("like");
              }
              if (x < 123 && x >= 40) {
                setSelected("emoji-happy");
              }
              if (x < 213 && x >= 123) {
                setSelected("sad-cry");
              }
            }
            if (nativeEvent.state === State.ACTIVE) {
              Animated.timing(translation, {
                toValue: -60,
                useNativeDriver: true,
              }).start();
            } else {
              setOpenEmoji((prev) => !prev);
            }
          }}
        >
          <Animated.View style={styles.header}>
            {getEmojiSelector()}
            <Text>{item.reactions.likes}</Text>
          </Animated.View>
        </LongPressGestureHandler>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons
          style={styles.icon}
          size={20}
          name="share-social-outline"
          color="black"
        />
        <Text> {item.reactions.comments.length} </Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons
          style={styles.icon}
          size={20}
          name="ios-chatbox-outline"
          color="black"
        />
        <Text> {item.reactions.shares}</Text>
      </View>
    </View>
  );
};
const Post = ({ item, navigation, options }) => {
  const { miniVersion } = options;

  return (
    <ScrollView>
      <View style={styles.postContainer}>
        <TouchableOpacity
          onPress={() => {
            if (!miniVersion) return;
            navigation.navigate("Question");
          }}
        >
          <Text style={styles.tagContainer}>{item.tag}</Text>
          <View style={styles.header}>
            <AvatarImage
              uri={item.author.image}
              name={item.author.name}
              nameTitle="Asked a question"
              nameSubTitle="Diagnosed recently"
            />
            <Feather name="more-vertical" size={24} color="black" />
          </View>
          <Text style={styles.questionContainer}>{item.title}</Text>
          <Text style={styles.messageContainer}>
            <ReadMore data={item.message} miniVersion={miniVersion} />
          </Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <EvilIcons
            style={styles.icon}
            name="location"
            size={20}
            color="#00A981"
          />
          <Text style={styles.iconText}>{item.location}</Text>
        </View>
        <PostFooter item={item} />
        {!miniVersion && <CommentList data={item.reactions.comments} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  nameContainer: {
    marginLeft: 10,
  },
  questionContainer: {
    fontSize: 18,
    marginBottom: 10,
  },
  messageContainer: {
    lineHeight: 20,
    marginTop: 10,
  },
  postFooter: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    width: "100%",
    borderTopWidth: 1,
    paddingTop: 14,
    borderTopColor: "gray",
  },
  iconContainer: {
    flexDirection: "row",
    marginRight: 20,
    alignItems: "flex-start",
    marginTop: 10,
  },
  icon: {
    height: 24,
    width: 24,
  },
  iconText: {
    color: "#00A981",
  },
  showMore: {
    color: "green",
  },
  nameContainer: {
    marginLeft: 10,
    flexDirection: "row",
  },
  name: {
    flexDirection: "row",
  },
  nameSubTitle: {
    marginLeft: 10,
    color: "#0089A1",
  },
  nameTitle: {
    color: "gray",
  },
  commentsContainer: {
    // flexDirection: "column",
    marginTop: 10,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 25,
    padding: 5,
  },
  commentBox: {
    borderWidth: 1,
    borderColor: "black",
    height: 50,
    borderRadius: 5,
    padding: 10,
    flexDirection: "row-reverse",
  },
  tagContainer: {
    color: "gray",
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
  openEmojiContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
});
export default Post;
