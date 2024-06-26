import { DiscussionEmbed } from 'disqus-react';

const DisqusComments = ({ url, identifier, title }) => {
  const disqusShortname = 'keysandquests'; // Replace with your Disqus shortname
  const disqusConfig = {
    url: url,
    identifier: identifier,
    title: title,
  };

  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;