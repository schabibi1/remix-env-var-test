import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

interface Blok {
  blok: {
    _uid: string;
    columns: [
      {
        _uid: string;
      }
    ]
  }
}

const Grid = ({ blok }: Blok) => {
  return (<ul {...storyblokEditable(blok)} key={blok._uid}>
    {blok.columns.map((blok) => (
      <li key={blok._uid} />
    ))}
  </ul>
  )
};

export default Grid;