import glamorous from 'glamorous';

export const DemoWrapper = glamorous.div({
  display: 'flex'
});

export const CanvasWrapper = glamorous.main({
  flex: 1,
});

export const ControlsWrapper = glamorous.aside({
  flex: 1,
  padding: 10,
  height: '100vh',
  overflow: 'auto',
  boxSizing: 'border-box'
});
