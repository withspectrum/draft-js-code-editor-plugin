// @flow
import CodeUtils from 'draft-js-code';
import { RichUtils } from 'draft-js';
import insertEmptyBlock from './modifiers/insertEmptyBlock';

type Options = {};

type EditorState = Object;
type PluginFunctions = {
  setEditorState: Function,
  getEditorState: Function,
};
type Command = string;

const createCodeEditorPlugin = (options?: Options) => {
  return {
    handleKeyCommand(command: Command, editorState: EditorState, { setEditorState }: PluginFunctions) {
      let newState;
      if (CodeUtils.hasSelectionInBlock(editorState)) {
        newState = CodeUtils.handleKeyCommand(editorState, command);
      } else {
        newState = RichUtils.handleKeyCommand(editorState, command);
      }

      if (newState) {
          setEditorState(newState);
          return 'handled';
      }
      return 'not-handled';
    },
    keyBindingFn(evt: Event, { getEditorState, setEditorState }: PluginFunctions) {
      const editorState = getEditorState();
      if (!CodeUtils.hasSelectionInBlock(editorState)) return;

      return CodeUtils.getKeyBinding(evt);
    },
    handleReturn(evt: Event, editorState: EditorState, { setEditorState }: PluginFunctions) {
      let newEditorState = editorState;

      if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';
      
      if (evt.ctrlKey || evt.altKey) {
          newEditorState = insertEmptyBlock(editorState);
      } else {
          newEditorState = CodeUtils.handleReturn(evt, editorState)
      }

      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
        return 'handled'
      }

      return 'not-handled';
    },
    onTab(evt: Event, { getEditorState, setEditorState }: PluginFunctions) {
      const editorState = getEditorState()
      if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

      setEditorState(CodeUtils.onTab(evt, editorState));
      return 'handled';
    }
  }
}

export default createCodeEditorPlugin;
