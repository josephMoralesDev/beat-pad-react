import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Block from '../../components/Block/Block.js';

configure({ adapter: new Adapter() });

test('Block is grey if audioLoaded is null', () => {
  // Render a checkbox with label in the document
  const block = shallow(
    <Block/>
  );
  expect(block.hasClass('block')).toEqual(true);
});

test('Block is orange if audioLoaded', () => {
  // Render a checkbox with label in the document
  const block = shallow(
    <Block audioSource='https://sample-videos.com/audio/mp3/crowd-cheering.mp3'/>
  );
  expect(block.hasClass('block audio-loaded')).toEqual(true);
});

test('Block is green if isPlaying and audioSource song is true', () => {
  // Render a checkbox with label in the document
  const block = shallow(
    <Block audioSource='https://sample-videos.com/audio/mp3/crowd-cheering.mp3' isPlaying/>
  );
  expect(block.hasClass('block audio-loaded play')).toEqual(true);
});
