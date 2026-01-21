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
      padding: 35,
      fontFamily: isRTL ? "Cairo" : "Inter",
      fontSize: 9,
      lineHeight: 1.4,
      direction: isRTL ? "rtl" : "ltr",
      backgroundColor: "#FFFFFF",
    },
    header: {
      marginBottom: 20,
    },
    headerContent: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    headerInfo: {
      flex: 1,
    },
    name: {
      fontSize: 26,
      fontWeight: 700,
      color: "#1F2937",
      marginBottom: 8,
      textAlign: isRTL ? "right" : "left",
    },
    contactRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 12,
    },
    contactItem: {
      fontSize: 9,
      color: "#6B7280",
      textAlign: isRTL ? "right" : "left",
    },
    contactLink: {
      fontSize: 9,
      color: accentColor,
      textDecoration: "none",
    },
    photo: {
      width: 55,
      height: 55,
      borderRadius: 4,
    },
    section: {
      marginBottom: 14,
    },
    sectionTitle: {
      fontSize: 10,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      textAlign: isRTL ? "right" : "left",
    },
    summary: {
      fontSize: 9,
      color: "#374151",
      lineHeight: 1.5,
      textAlign: isRTL ? "right" : "left",
    },
    experienceItem: {
      marginBottom: 10,
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
      color: "#9CA3AF",
    },
    company: {
      fontSize: 9,
      color: "#6B7280",
      marginBottom: 3,
      textAlign: isRTL ? "right" : "left",
    },
    description: {
      fontSize: 8,
      color: "#4B5563",
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
      color: "#6B7280",
      textAlign: isRTL ? "right" : "left",
    },
    skillsContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 6,
    },
    skillItem: {
      fontSize: 8,
      color: "#374151",
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
      textAlign: isRTL ? "right" : "left",
    },
  });

interface Props {
  data: CVData;
}

export function MinimalPDF({ data }: Props) {
  const isRTL = data.language === "ar";
  const l = labels[data.language];
  const styles = createStyles(data.accentColor, isRTL);
  const phoneDisplay = formatPhoneDisplay(data.phone);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{data.fullName}</Text>
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
            {data.photoUrl && getPhotoSource(data.photoUrl) && (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image
                src={getPhotoSource(data.photoUrl)!}
                style={styles.photo}
              />
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
              {data.skills.map((skill, index) => (
                <Text key={skill.id} style={styles.skillItem}>
                  {skill.name}
                  {index < data.skills.length - 1 ? " • " : ""}
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
                    {index < data.languages.length - 1 ? " • " : ""}
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
