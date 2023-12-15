/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useEffect, useState } from "react";
import axios from "axios";

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const [allContactsData, setAllContactsData] = useState([]);

  useEffect(() => {
    axios
      .get("https://hastag-admin-default-rtdb.firebaseio.com/contacts.json")
      .then((response) => {
        const contacts = Object.values(response.data); // Assuming the API returns an array of blog objects
        setAllContactsData(contacts);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  }, []);
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Name", accessor: "name", width: "10%", align: "left" },
      { Header: "Email", accessor: "email", width: "35%", align: "left" },
      { Header: "Mobile Number", accessor: "mobileNumber", align: "center" },
      { Header: "Subject", accessor: "subject", align: "center" },
      { Header: "Comments", accessor: "comments", align: "center" },
    ],

    rows: allContactsData?.map((ele) => {
      let Rows = {
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {ele.name}
          </MDTypography>
        ),
        email: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {ele.email}
          </MDTypography>
        ),
        mobileNumber: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {ele.mobileNumber}
          </MDTypography>
        ),
        subject: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {ele.subject}
          </MDTypography>
        ),
        comments: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {ele.comments}
          </MDTypography>
        ),
      };

      return Rows;
    }),
  };
}
