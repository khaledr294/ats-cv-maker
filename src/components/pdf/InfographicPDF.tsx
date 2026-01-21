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
    header: {
      backgroundColor: accentColor,
      padding: 20,
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      gap: 15,
    },
    photoContainer: {
      alignItems: "center",
    },
    photo: {
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 3,
      borderColor: "#FFFFFF",
      borderStyle: "solid",
    },
    headerInfo: {
      flex: 1,
    },
    name: {
      fontSize: 20,
      fontWeight: 700,
      color: "#FFFFFF",
      marginBottom: 4,
      textAlign: isRTL ? "right" : "left",
    },
    title: {
      fontSize: 10,
      color: "rgba(255,255,255,0.9)",
      marginBottom: 8,
      textAlign: isRTL ? "right" : "left",
    },
    contactRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 10,
    },
    contactItem: {
      fontSize: 8,
      color: "rgba(255,255,255,0.9)",
    },
    contactLink: {
      fontSize: 8,
      color: "#FFFFFF",
      textDecoration: "none",
    },
    body: {
      padding: 20,
    },
    summarySection: {
      marginBottom: 15,
      backgroundColor: "#F8FAFC",
      padding: 12,
      borderRadius: 4,
    },
    summaryText: {
      fontSize: 9,
      color: "#374151",
      lineHeight: 1.5,
      textAlign: isRTL ? "right" : "left",
    },
    row: {
      flexDirection: isRTL ? "row-reverse" : "row",
      gap: 20,
      marginBottom: 15,
    },
    column: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 8,
      textAlign: isRTL ? "right" : "left",
      borderBottomWidth: 2,
      borderBottomColor: accentColor,
      borderBottomStyle: "solid",
      paddingBottom: 3,
    },
    skillsGrid: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 5,
    },
    skillBadge: {
      fontSize: 8,
      color: "#FFFFFF",
      backgroundColor: accentColor,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10,
    },
    experienceItem: {
      marginBottom: 10,
      paddingLeft: isRTL ? 0 : 8,
      paddingRight: isRTL ? 8 : 0,
      borderLeftWidth: isRTL ? 0 : 2,
      borderRightWidth: isRTL ? 2 : 0,
      borderLeftColor: accentColor,
      borderRightColor: accentColor,
      borderLeftStyle: "solid",
      borderRightStyle: "solid",
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
      marginBottom: 8,
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
    languagesContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 8,
    },
    languageItem: {
      fontSize: 9,
      color: "#374151",
      backgroundColor: "#F3F4F6",
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 4,
    },
  });

interface Props {
  data: CVData;
}

export function InfographicPDF({ data }: Props) {
  const isRTL = data.language === "ar";
  const l = labels[data.language];
  const styles = createStyles(data.accentColor, isRTL);
  const phoneDisplay = formatPhoneDisplay(data.phone);

  const currentTitle =
    data.experience.length > 0 ? data.experience[0].position : "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with accent background */}
        <View style={styles.header}>
          {data.photoUrl && getPhotoSource(data.photoUrl) && (
            <View style={styles.photoContainer}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                src={getPhotoSource(data.photoUrl)!}
                style={styles.photo}
              />
            </View>
          )}
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{data.fullName}</Text>
            {currentTitle && <Text style={styles.title}>{currentTitle}</Text>}
            <View style={styles.contactRow}>
              {data.email && (
                <Text style={styles.contactItem}>{data.email}</Text>
              )}
              {phoneDisplay && (
                <Text style={styles.contactItem}>{phoneDisplay}</Text>
              )}
              {data.location && (
                <Text style={styles.contactItem}>{data.location}</Text>
              )}
              {data.website && (
                <Link src={data.website} style={styles.contactLink}>
                  {data.website.replace(/^https?:\/\//, "")}
                </Link>
              )}
              {data.linkedin && (
                <Link src={data.linkedin} style={styles.contactLink}>
                  LinkedIn
                </Link>
              )}
              {data.github && (
                <Link src={data.github} style={styles.contactLink}>
                  GitHub
                </Link>
              )}
            </View>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Summary */}
          {data.summary && (
            <View style={styles.summarySection}>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          )}

          {/* Skills and Languages row */}
          <View style={styles.row}>
            {/* Skills */}
            {data.skills.length > 0 && (
              <View style={styles.column}>
                <Text style={styles.sectionTitle}>{l.skills}</Text>
                <View style={styles.skillsGrid}>
                  {data.skills.map((skill) => (
                    <Text key={skill.id} style={styles.skillBadge}>
                      {skill.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <View style={styles.column}>
                <Text style={styles.sectionTitle}>{l.languages}</Text>
                <View style={styles.languagesContainer}>
                  {data.languages.map((lang) => {
                    const profLabel =
                      proficiencyLabels[data.language][lang.proficiency] ||
                      lang.proficiency;
                    return (
                      <Text key={lang.id} style={styles.languageItem}>
                        {lang.name} - {profLabel}
                      </Text>
                    );
                  })}
                </View>
              </View>
            )}
          </View>

          {/* Experience */}
          {data.experience.length > 0 && (
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.sectionTitle}>{l.experience}</Text>
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
            <View>
              <Text style={styles.sectionTitle}>{l.education}</Text>
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
