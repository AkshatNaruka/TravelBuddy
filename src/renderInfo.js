import React from 'react';

function renderInfo(info) {
  return info.split('\n').map((line, index) => {
    const trimmedLine = line.trim(); // Trim leading/trailing spaces

    if (trimmedLine.startsWith('## ')) {
      // Remove leading ## for headings
      return <h2 key={index}>{trimmedLine.slice(3)}</h2>;
    } else if (trimmedLine.startsWith('* ')) {
      // Remove leading asterisk and any subsequent asterisks within the list item content
      return (
        <li key={index}>
          {trimmedLine.slice(2).replace(/\*/g, '')}
        </li>
      );
    } else if (trimmedLine.startsWith('  * ')) {
      // Remove leading spaces and asterisk for sub-bullet points
      return <li key={index}>{trimmedLine.slice(4)}</li>;
    } else if (trimmedLine.match(/^Further Reading|^/)) {
      // Handle "Further Reading" section without asterisks
      return <p key={index}>{trimmedLine}</p>;
    } else if (trimmedLine.match(/^https?:\/\//)) {
      // Handle links (URLs)
      const url = trimmedLine;
      return (
        <p key={index}>
          <a href={url} target="_blank" rel="noreferrer noopener">
            {url}
          </a>
        </p>
      );
    } else {
      // Remove remaining asterisks within paragraphs or descriptions
      return <p key={index}>{trimmedLine.replace(/\*/g, '')}</p>;
    }
  });
}

export default renderInfo;
