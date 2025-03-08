import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { home_screen_img } from '../../assets/images/images';

const storiesData = [
  {
    id: 1,
    image: home_screen_img.storyImage1,
    live: true,
  },
  {
    id: 2,
    image: home_screen_img.storyImage2,
    live: false,
  },
  {
    id: 3,
    image: home_screen_img.storyImage3,
    live: true,
  },
  {
    id: 4,
    image: home_screen_img.storyImage4,
    live: false,
  },
  {
    id: 5,
    image: home_screen_img.storyImage5,
    live: false,
  },
  {
    id: 6,
    image: home_screen_img.storyImage6,
    live: false,
  },
];

const Stories = () => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Stories</Text>
      <ScrollView horizontal style={styles.stories} showsHorizontalScrollIndicator={false}>
        {storiesData.map((story) => (
          <View key={story.id} style={styles.story}>
            <Image source={story.image} style={styles.storyImage} />
            {story.live && <Text style={styles.liveBadge}>Live</Text>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 24,
  },
  stories: {
    flexDirection: 'row',
    marginTop: 8,
  },
  story: {
    position: 'relative',
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  storyImage: {
    width: 100,
    height: 150,
    borderRadius: 12,
  },
  liveBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#10B981',
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

export default Stories;