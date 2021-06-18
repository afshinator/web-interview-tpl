import React from "react";
import { useSelector } from "react-redux";
import { selectQueries } from "./gametimeSlice";
import styles from "./GametimeSearch.module.css";

const MAX_ENTRIES_TO_SHOW = 3;
const MAX_IMG_SIZE = "32px";

export default function Results({ term }) {
  const allQueryResults = useSelector(selectQueries);

  if (allQueryResults[term]) {
    if (allQueryResults[term].status === "in progress") {
      return <div className={styles.resultsBox}>WAIT FOR IT...</div>;
    }
    if (allQueryResults[term].status === "success") {
      // Basic sanity check
      if (
        !allQueryResults[term].data.events ||
        !allQueryResults[term].data.events.length
      ) {
        return <div className={styles.resultsBox}> No results to show</div>;
      } else {
        return (
          <div className={styles.resultsBox}>
            {allQueryResults[term].data.events.map((e, i) => {
              if (i < MAX_ENTRIES_TO_SHOW)
                return <EventPerformerVenue key={e.event.id} eventsEntry={e} />;
              else return null;
            })}
          </div>
        );
      }
    }
  } else return null;
}

function EventPerformerVenue({ eventsEntry }) {
  // console.log(eventsEntry)
  return (
    <section>
      {/* Event */}
      <ResultRow
        img={eventsEntry.performers[0].hero_image_url}
        alt={eventsEntry.performers[0].name}
        title={eventsEntry.event.name}
        subtitle={eventsEntry.venue.name}
      />
      <hr></hr>
      {/* Venue */}
      <ResultRow
        img={eventsEntry.venue.image_url}
        alt={eventsEntry.venue.name}
        title={eventsEntry.venue.name}
        subtitle={eventsEntry.venue.city}
      />
      <hr></hr>
      {/* The first Performer */}
      <ResultRow
        img={eventsEntry.performers[0].hero_image_url}
        alt={eventsEntry.performers[0].name}
        title={eventsEntry.performers[0].name}
        subtitle={eventsEntry.performers[0].category}
      />
      <hr></hr>
    </section>
  );
}

function ResultRow({ img,alt, title, subtitle }) {
  return (
    <div className={styles.resultsRow}>
      <img src={img} width={MAX_IMG_SIZE} alt={alt} />
      <div className={styles.col}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
    </div>
  );
}
