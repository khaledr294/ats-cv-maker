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

const createStyles = (isRTL: boolean) =>
  StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: isRTL ? "Cairo" : "Inter",
      fontSize: 9,
      lineHeight: 1.4,
      direction: isRTL ? "rtl" : "ltr",
      backgroundColor: "#FFFFFF",
    },
    header: {
      marginBottom: 20,
      textAlign: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#000000",
      borderBottomStyle: "solid",
      paddingBottom: 15,
    },
    name: {
      fontSize: 22,
      fontWeight: 700,
      color: "#000000",
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 2,
    },
    contactRow: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 15,
      marginTop: 8,
    },
    contactItem: {
      fontSize: 9,
      color: "#374151",
    },
    contactLink: {
      fontSize: 9,
      color: "#374151",
      textDecoration: "none",
    },
    photoContainer: {
      alignItems: "center",
      marginBottom: 10,
    },
    photo: {
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 1,
      borderColor: "#000000",
      borderStyle: "solid",
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: "#000000",
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 1,
      borderBottomWidth: 1,
      borderBottomColor: "#D1D5DB",
      borderBottomStyle: "solid",
      paddingBottom: 4,
      textAlign: isRTL ? "right" : "left",
    },
    summary: {
      fontSize: 9,
      color: "#374151",
      lineHeight: 1.6,
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
      color: "#6B7280",
      fontStyle: "italic",
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
    skillsContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 8,
    },
    skillItem: {
      fontSize: 9,
      color: "#374151",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderWidth: 1,
      borderColor: "#D1D5DB",
      borderStyle: "solid",
    },
    languagesContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 10,
    },
    languageItem: {
      fontSize: 9,
      color: "#374151",
      textAlign: isRTL ? "right" : "left",
    },
  });

interface Props {
  data: CVData;
}

export function ClassicPDF({ data }: Props) {
  const isRTL = data.language === "ar";
  const l = labels[data.language];
  const styles = createStyles(isRTL);
  const phoneDisplay = formatPhoneDisplay(data.phone);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
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
          <Text style={styles.name}>{data.fullName}</Text>
          <View style={styles.contactRow}>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
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

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{l.summary}</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
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
          <View style={styles.section}>
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

        {/* Skills */}
        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{l.skills}</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.skillItem}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{l.languages}</Text>
            <View style={styles.languagesContainer}>
              {data.languages.map((lang, index) => {
                const profLabel =
                  proficiencyLabels[data.language][lang.proficiency] ||
                  lang.proficiency;
                return (
                  <Text key={lang.id} style={styles.languageItem}>
                    {lang.name} ({profLabel})
                    {index < data.languages.length - 1 ? " | " : ""}
                  </Text>
                );
              })}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
