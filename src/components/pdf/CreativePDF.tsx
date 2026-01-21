import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";
import { CVData } from "@/types/cv";
import {
  proficiencyLabels,
  labels,
  formatPhoneDisplay,
  getPhotoSource,
} from "./shared";
import "./shared"; // Import to register fonts

const createStyles = (accentColor: string, isRTL: boolean) =>
  StyleSheet.create({
    page: {
      padding: 0,
      fontFamily: isRTL ? "Cairo" : "Inter",
      fontSize: 9,
      lineHeight: 1.4,
      direction: isRTL ? "rtl" : "ltr",
      backgroundColor: "#FFFFFF",
    },
    sidebar: {
      position: "absolute",
      top: 0,
      left: isRTL ? undefined : 0,
      right: isRTL ? 0 : undefined,
      width: 180,
      height: "100%",
      backgroundColor: accentColor,
      padding: 20,
    },
    mainContent: {
      marginLeft: isRTL ? 0 : 180,
      marginRight: isRTL ? 180 : 0,
      padding: 25,
    },
    photoContainer: {
      alignItems: "center",
      marginBottom: 15,
    },
    photo: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: "#FFFFFF",
      borderStyle: "solid",
    },
    sidebarName: {
      fontSize: 16,
      fontWeight: 700,
      color: "#FFFFFF",
      textAlign: "center",
      marginBottom: 15,
    },
    sidebarSection: {
      marginBottom: 15,
    },
    sidebarTitle: {
      fontSize: 10,
      fontWeight: 700,
      color: "#FFFFFF",
      marginBottom: 6,
      textTransform: "uppercase",
      textAlign: isRTL ? "right" : "left",
    },
    sidebarText: {
      fontSize: 8,
      color: "#FFFFFF",
      opacity: 0.9,
      marginBottom: 3,
      textAlign: isRTL ? "right" : "left",
    },
    sidebarLink: {
      fontSize: 8,
      color: "#FFFFFF",
      opacity: 0.9,
      textDecoration: "none",
      marginBottom: 3,
    },
    skillItem: {
      fontSize: 8,
      color: "#FFFFFF",
      backgroundColor: "rgba(255,255,255,0.2)",
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 8,
      marginBottom: 4,
    },
    mainSection: {
      marginBottom: 15,
    },
    mainTitle: {
      fontSize: 13,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 8,
      textAlign: isRTL ? "right" : "left",
    },
    summary: {
      fontSize: 9,
      color: "#374151",
      lineHeight: 1.5,
      textAlign: isRTL ? "right" : "left",
    },
    experienceItem: {
      marginBottom: 12,
    },
    experienceHeader: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      marginBottom: 2,
    },
    jobTitle: {
      fontSize: 10,
      fontWeight: 700,
      color: "#1F2937",
      textAlign: isRTL ? "right" : "left",
    },
    dateText: {
      fontSize: 8,
      color: accentColor,
      fontWeight: 700,
    },
    company: {
      fontSize: 9,
      color: "#4B5563",
      marginBottom: 3,
      textAlign: isRTL ? "right" : "left",
    },
    description: {
      fontSize: 8,
      color: "#374151",
      lineHeight: 1.5,
      textAlign: isRTL ? "right" : "left",
    },
    educationItem: {
      marginBottom: 10,
    },
    degree: {
      fontSize: 10,
      fontWeight: 700,
      color: "#1F2937",
      textAlign: isRTL ? "right" : "left",
    },
    institution: {
      fontSize: 9,
      color: "#4B5563",
      textAlign: isRTL ? "right" : "left",
    },
  });

interface Props {
  data: CVData;
}

export function CreativePDF({ data }: Props) {
  const isRTL = data.language === "ar";
  const l = labels[data.language];
  const styles = createStyles(data.accentColor, isRTL);
  const phoneDisplay = formatPhoneDisplay(data.phone);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {data.photoUrl && getPhotoSource(data.photoUrl) && (
            <View style={styles.photoContainer}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                src={getPhotoSource(data.photoUrl)!}
                style={styles.photo}
              />
            </View>
          )}
          <Text style={styles.sidebarName}>{data.fullName}</Text>

          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>
              {isRTL ? "التواصل" : "Contact"}
            </Text>
            {data.email && <Text style={styles.sidebarText}>{data.email}</Text>}
            {phoneDisplay && (
              <Text style={styles.sidebarText}>{phoneDisplay}</Text>
            )}
            {data.location && (
              <Text style={styles.sidebarText}>{data.location}</Text>
            )}
            {data.website && (
              <Link src={data.website} style={styles.sidebarLink}>
                {data.website.replace(/^https?:\/\//, "")}
              </Link>
            )}
            {data.linkedin && (
              <Link src={data.linkedin} style={styles.sidebarLink}>
                LinkedIn
              </Link>
            )}
            {data.github && (
              <Link src={data.github} style={styles.sidebarLink}>
                GitHub
              </Link>
            )}
          </View>

          {/* Skills */}
          {data.skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>{l.skills}</Text>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.skillItem}>
                  {skill.name}
                </Text>
              ))}
            </View>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>{l.languages}</Text>
              {data.languages.map((lang) => {
                const profLabel =
                  proficiencyLabels[data.language][lang.proficiency] ||
                  lang.proficiency;
                return (
                  <Text key={lang.id} style={styles.sidebarText}>
                    {lang.name} - {profLabel}
                  </Text>
                );
              })}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Summary */}
          {data.summary && (
            <View style={styles.mainSection}>
              <Text style={styles.mainTitle}>{l.summary}</Text>
              <Text style={styles.summary}>{data.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainTitle}>{l.experience}</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.dateText}>
                      {exp.startDate} - {exp.current ? l.present : exp.endDate}
                    </Text>
                  </View>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.description}>{exp.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainTitle}>{l.education}</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.degree}>
                      {edu.degree} - {edu.field}
                    </Text>
                    <Text style={styles.dateText}>
                      {edu.startDate} - {edu.current ? l.present : edu.endDate}
                    </Text>
                  </View>
                  <Text style={styles.institution}>{edu.institution}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
