// @flow
import createCodeEditorPlugin from '../';

it('should return an object', () => {
  expect(createCodeEditorPlugin()).toBeInstanceOf(Object);;
});

it('should override some hooks', () => {
  expect(createCodeEditorPlugin()).toMatchSnapshot();
});
