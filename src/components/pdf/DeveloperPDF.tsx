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
      padding: 30,
      fontFamily: isRTL ? "Cairo" : "Inter",
      fontSize: 9,
      lineHeight: 1.4,
      direction: isRTL ? "rtl" : "ltr",
      backgroundColor: "#0F172A",
    },
    header: {
      marginBottom: 15,
      paddingBottom: 12,
      borderBottomWidth: 2,
      borderBottomColor: accentColor,
      borderBottomStyle: "solid",
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
      fontSize: 22,
      fontWeight: 700,
      color: "#FFFFFF",
      marginBottom: 4,
      textAlign: isRTL ? "right" : "left",
    },
    title: {
      fontSize: 10,
      color: accentColor,
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
      color: "#94A3B8",
      textAlign: isRTL ? "right" : "left",
    },
    contactLink: {
      fontSize: 8,
      color: accentColor,
      textDecoration: "none",
    },
    photo: {
      width: 55,
      height: 55,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: accentColor,
      borderStyle: "solid",
    },
    section: {
      marginBottom: 14,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 6,
      textAlign: isRTL ? "right" : "left",
    },
    summary: {
      fontSize: 9,
      color: "#CBD5E1",
      lineHeight: 1.5,
      textAlign: isRTL ? "right" : "left",
    },
    experienceItem: {
      marginBottom: 10,
      backgroundColor: "#1E293B",
      padding: 8,
      borderRadius: 4,
    },
    experienceHeader: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      marginBottom: 2,
    },
    jobTitle: {
      fontSize: 10,
      fontWeight: 700,
      color: "#FFFFFF",
      textAlign: isRTL ? "right" : "left",
    },
    dateText: {
      fontSize: 8,
      color: accentColor,
    },
    company: {
      fontSize: 9,
      color: "#94A3B8",
      marginBottom: 3,
      textAlign: isRTL ? "right" : "left",
    },
    description: {
      fontSize: 8,
      color: "#CBD5E1",
      lineHeight: 1.5,
      textAlign: isRTL ? "right" : "left",
    },
    educationItem: {
      marginBottom: 8,
      backgroundColor: "#1E293B",
      padding: 8,
      borderRadius: 4,
    },
    degree: {
      fontSize: 10,
      fontWeight: 700,
      color: "#FFFFFF",
      textAlign: isRTL ? "right" : "left",
    },
    institution: {
      fontSize: 9,
      color: "#94A3B8",
      textAlign: isRTL ? "right" : "left",
    },
    skillsContainer: {
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
      borderRadius: 4,
    },
    projectItem: {
      marginBottom: 8,
      backgroundColor: "#1E293B",
      padding: 8,
      borderRadius: 4,
    },
    projectName: {
      fontSize: 10,
      fontWeight: 700,
      color: accentColor,
      textAlign: isRTL ? "right" : "left",
    },
    projectDesc: {
      fontSize: 8,
      color: "#CBD5E1",
      marginTop: 2,
      textAlign: isRTL ? "right" : "left",
    },
    techStack: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 4,
      marginTop: 4,
    },
    techBadge: {
      fontSize: 7,
      color: "#94A3B8",
      backgroundColor: "#334155",
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 2,
    },
    languagesContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 8,
    },
    languageItem: {
      fontSize: 9,
      color: "#CBD5E1",
      textAlign: isRTL ? "right" : "left",
    },
  });

interface Props {
  data: CVData;
}

export function DeveloperPDF({ data }: Props) {
  const isRTL = data.language === "ar";
  const l = labels[data.language];
  const styles = createStyles(data.accentColor, isRTL);
  const phoneDisplay = formatPhoneDisplay(data.phone);

  const currentTitle =
    data.experience.length > 0
      ? data.experience[0].position
      : isRTL
        ? "مطور برمجيات"
        : "Software Developer";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{data.fullName}</Text>
              <Text style={styles.title}>{currentTitle}</Text>
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
                {data.github && (
                  <Link src={data.github} style={styles.contactLink}>
                    GitHub
                  </Link>
                )}
                {data.linkedin && (
                  <Link src={data.linkedin} style={styles.contactLink}>
                    LinkedIn
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
            <Text style={styles.sectionTitle}>
              {isRTL ? "نبذة تقنية" : "About Me"}
            </Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isRTL ? "التقنيات" : "Tech Stack"}
            </Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.skillBadge}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{l.projects}</Text>
            {data.projects.map((project) => (
              <View key={project.id} style={styles.projectItem}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectDesc}>{project.description}</Text>
                {project.technologies && project.technologies.length > 0 && (
                  <View style={styles.techStack}>
                    {project.technologies.map((tech, i) => (
                      <Text key={i} style={styles.techBadge}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
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
