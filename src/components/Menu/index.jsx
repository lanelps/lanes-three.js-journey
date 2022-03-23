import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Go } from "~components";

const MenuContainer = styled.article`
  padding: 1rem;
  border: 1px solid #fff;
  grid-column: span 2;

  max-height: calc(100vh - 4rem);
  overflow-y: scroll;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LinkList = styled(List)`
  margin-top: 1rem;
`;

const chapters = [
  {
    id: 1,
    title: `Chapter 1`,
    lessons: [
      {
        id: 3,
        title: `Basic Scene`,
        url: `/lessons/3`
      },
      {
        id: 4,
        title: `Webpack`,
        url: `/lessons/4`
      },
      {
        id: 5,
        title: `Transform Objects`,
        url: `/lessons/5`
      },
      {
        id: 6,
        title: `Animations`,
        url: `/lessons/6`
      },
      {
        id: 7,
        title: `Cameras`,
        url: `/lessons/7`
      },
      {
        id: 8,
        title: `Fullscreen and resizing`,
        url: `/lessons/8`
      },
      {
        id: 9,
        title: `Geometries`,
        url: `/lessons/9`
      },
      {
        id: 10,
        title: `Debug UI`,
        url: `/lessons/10`
      },
      {
        id: 11,
        title: `Textures`,
        url: `/lessons/11`
      },
      {
        id: 12,
        title: `Materials`,
        url: `/lessons/12`
      },
      {
        id: 13,
        title: `3D Text`,
        url: `/lessons/13`
      }
      // {
      //   id: 14,
      //   title: `Go Live`,
      //   url: `/lessons/14`
      // }
    ]
  },
  {
    id: 2,
    title: `Chapter 2`,
    lessons: [
      {
        id: 15,
        title: `Lights`,
        url: `/lessons/15`
      },
      {
        id: 16,
        title: `Shadows`,
        url: `/lessons/16`
      }
    ]
  }
];

const Menu = () => (
  <MenuContainer>
    <nav>
      <List>
        <li>
          <Go to="/">Home</Go>
        </li>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <details>
              <summary>{chapter.title}</summary>
              <LinkList>
                {chapter.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Go to={lesson.url}>
                      {lesson.id} {lesson.title}
                    </Go>
                  </li>
                ))}
              </LinkList>
            </details>
          </li>
        ))}
      </List>
    </nav>
  </MenuContainer>
);

export default Menu;
