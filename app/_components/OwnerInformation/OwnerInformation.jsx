import React from "react";
import styles from "./OwnerInformation.module.scss";
import { Avatar } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Button from "../Button/Button";
import { CircularProgress, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
export default function OwnerInformation(props) {
  const { owner } = props;
  return (
    <div className={styles.ownerInformation}>
      <Card>
        <div className={styles.card}>
          <h3 className="center">Meet the host </h3>

          <CardContent className="center">
            <Link href={`/profile/${owner.name}`}>
              <div className={styles.avatarContainer}>
                <Avatar
                  alt="host image"
                  src={owner.avatar.url}
                  sx={{ width: 70, height: 70 }}
                />
              </div>

              <Typography variant="body2">
                <span className="bold">{owner.name}</span>
              </Typography>
            </Link>
            <Typography variant="body2" color="text.secondary">
              {owner.bio}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <span className={styles.mail}>
                <a href={"mailto:" + owner.email}>
                  <Button icon={<EmailIcon />} text="Message host" />
                </a>
              </span>
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
