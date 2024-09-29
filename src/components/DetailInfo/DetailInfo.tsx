import { Box, Chip, List, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import styles from "./DetailInfo.module.scss";

// interface DetailInfoProps {
//   selectedRepository: RepositoryData | null;
// }

export const DetailInfo = ({ selectedRepository }) => {
  return (
    <Box className={styles.detail} component="aside">
      {!selectedRepository ? (
        <Typography className={styles.welcome}>Выберите репозиторий</Typography>
      ) : (
        <Box className={styles["content-wrapper"]}>
          <Typography
            className={styles["repo-name"]}
            component="h2"
            variant="h3"
          >
            {selectedRepository.name}
          </Typography>
          <Box className={styles["main-info"]}>
            <Chip
              className={styles.chip}
              label={selectedRepository.primaryLanguageName}
            ></Chip>
            <Box className={styles["star-wrapper"]}>
              <StarIcon className={styles.star} />
              <Typography>{selectedRepository.stargazerCount}</Typography>
            </Box>
          </Box>

          {selectedRepository.languages && (
            <List className={styles["list"]}>
              {/* {selectedRepository.languages.edges.map((language, index) => (
                <ListItem className={styles["list-item"]} key={index}>
                  <Chip
                    className={(styles.chip, styles["chip--alt"])}
                    label={language.node.name}
                  ></Chip>
                </ListItem>
              ))} */}
            </List>
          )}

          <Typography className={styles.description}>
            {selectedRepository.description}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
