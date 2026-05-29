import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useMemo} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {glaciertrailsIcadventrejornlGetById} from '../GlacierTrailsIcadventredata/glaciertrailsIcadventrejornlindex';
import type {GlacierTrailsIcadventrejornlStackParamList} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventrejornlnavtypes';
import GlacierTrailsIcadventrelay from '../GlacierTrailsIcadventrecmp/GlacierTrailsIcadventrelay';
import {recordArticleOpened} from './GlacierTrailsIcadventrejornlprogress';

const bg = '#144881';
const accent = '#5BB0D9';
const muted = '#7E9AB5';
const titleC = '#FFFFFF';
const card = '#082A4A';
const btnDark = '#061E3E';

type Nav = StackNavigationProp<
  GlacierTrailsIcadventrejornlStackParamList,
  'GlacierTrailsIcadventrejornldtl'
>;

function tagBorder(tag: string) {
  const palette = ['#5BB0D9', '#4EC8D9', '#6BA8C8', '#7E9AB5'];
  let h = 0;
  for (let i = 0; i < tag.length; i += 1) {
    h += tag.charCodeAt(i);
  }
  return palette[h % palette.length];
}

const GlacierTrailsIcadventrejornldtl = () => {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<Nav>();
  const route =
    useRoute<
      RouteProp<
        GlacierTrailsIcadventrejornlStackParamList,
        'GlacierTrailsIcadventrejornldtl'
      >
    >();
  const article = useMemo(
    () => glaciertrailsIcadventrejornlGetById(route.params.articleId),
    [route.params.articleId],
  );

  useEffect(() => {
    if (article) {
      void recordArticleOpened(article.id);
    }
  }, [article]);

  const share = () => {
    if (!article) {
      return;
    }
    Share.share({
      title: article.title,
      message: `${article.title}\n\n${article.body}`,
    }).catch(() => {});
  };

  if (!article) {
    return (
      <View style={[styles.root, {paddingTop: insets.top + 12}]}>
        <Pressable onPress={() => nav.goBack()} style={styles.roundBtn}>
          <Image
            source={require('../../assets/imgs/glaciertrailsback.png')}
            style={styles.roundBtnImg}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={styles.miss}>Article not found.</Text>
      </View>
    );
  }

  const headerMid = article.tag.toUpperCase();

  return (
    <GlacierTrailsIcadventrelay bounce={false}>
      <View style={styles.root}>
        <View style={[styles.topBar, {paddingTop: insets.top + 8}]}>
          <Pressable onPress={() => nav.goBack()} style={styles.roundBtn}>
            <Image
              source={require('../../assets/imgs/glaciertrailsback.png')}
              style={styles.roundBtnImg}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.topTitle}>{headerMid}</Text>
          <Pressable onPress={share} style={styles.roundBtn}>
            <Image
              source={require('../../assets/imgs/glaciertrailsshare.png')}
              style={styles.roundBtnImg}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        <View
          style={{
            paddingHorizontal: 18,
            paddingBottom: insets.bottom + 120,
            paddingTop: 8,
          }}>
          <View style={[styles.tagPill, {borderColor: tagBorder(article.tag)}]}>
            <Text style={styles.tagTxt}>{article.tag}</Text>
          </View>
          <Text style={styles.h1}>{article.title}</Text>
          <View style={styles.divider} />
          <Text style={styles.body}>{article.body}</Text>

          <Pressable
            onPress={share}
            style={({pressed}) => [styles.cta, pressed && {opacity: 0.92}]}>
            <Text style={styles.ctaTxt}>Share this Article</Text>
          </Pressable>
        </View>
      </View>
    </GlacierTrailsIcadventrelay>
  );
};

export default GlacierTrailsIcadventrejornldtl;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: bg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingBottom: 8.1,
  },
  topTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#6BA8C8',
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 1.4,
  },
  roundBtn: {
    width: 40,
    height: 40.4,
    borderRadius: 12.12,
    backgroundColor: '#0D2137',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1A3A5C',
  },
  roundBtnImg: {
    width: 18.2,
    height: 18,
  },
  miss: {
    marginTop: 24,
    paddingHorizontal: 18,
    color: '#4AAAD4',
    fontSize: 16,
  },
  tagPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#002F6D',
    marginBottom: 14,
  },
  tagTxt: {
    color: '#4AAAD4',
    fontSize: 12,
    fontWeight: '600',
  },
  h1: {
    color: titleC,
    fontSize: 20.2,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: '#1A3F63',
    marginVertical: 18,
  },
  body: {
    color: titleC,
    fontSize: 14,
    lineHeight: 26.26,
    fontWeight: '400',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 18,
    paddingTop: 12,
    backgroundColor: bg,
    borderTopWidth: 1,
    borderTopColor: '#0C2748',
  },
  cta: {
    backgroundColor: '#4AAAD4',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  ctaTxt: {
    color: '#061220',
    fontSize: 14.41,
    fontWeight: '700',
  },
});
