import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
  Image,
} from "@react-pdf/renderer";
import { CVData } from "@/types/cv";

// Register Arabic font (Cairo)
Font.register({
  family: "Cairo",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hOA-a1PiKw.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hGA-a1PiKw.ttf",
      fontWeight: 700,
    },
  ],
});

// Register English font (Inter)
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZg.ttf",
      fontWeight: 700,
    },
  ],
});

// Helper function to format phone for display
const formatPhoneDisplay = (phone?: string) => {
  if (!phone) return "";
  return phone;
};

// Create styles
const createStyles = (accentColor: string, isRTL: boolean) =>
  StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: isRTL ? "Cairo" : "Inter",
      fontSize: 10,
      lineHeight: 1.5,
      direction: isRTL ? "rtl" : "ltr",
    },
    header: {
      marginBottom: 20,
      paddingBottom: 15,
      borderBottomWidth: 3,
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
      fontSize: 28,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 8,
      textAlign: isRTL ? "right" : "left",
    },
    contactRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 12,
      marginTop: 8,
    },
    contactItem: {
      fontSize: 9,
      color: "#4B5563",
      textAlign: isRTL ? "right" : "left",
    },
    contactLink: {
      fontSize: 9,
      color: accentColor,
      textDecoration: "none",
    },
    photo: {
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 3,
      borderColor: accentColor,
      borderStyle: "solid",
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 8,
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: "#E5E7EB",
      borderBottomStyle: "solid",
      textAlign: isRTL ? "right" : "left",
    },
    summary: {
      fontSize: 10,
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
      fontSize: 11,
      fontWeight: 700,
      color: "#1F2937",
      textAlign: isRTL ? "right" : "left",
    },
    dateText: {
      fontSize: 9,
      color: "#6B7280",
      textAlign: isRTL ? "left" : "right",
    },
    company: {
      fontSize: 10,
      color: "#4B5563",
      marginBottom: 4,
      textAlign: isRTL ? "right" : "left",
    },
    description: {
      fontSize: 9,
      color: "#374151",
      lineHeight: 1.5,
      textAlign: isRTL ? "right" : "left",
    },
    educationItem: {
      marginBottom: 10,
    },
    degree: {
      fontSize: 11,
      fontWeight: 700,
      color: "#1F2937",
      textAlign: isRTL ? "right" : "left",
    },
    institution: {
      fontSize: 10,
      color: "#4B5563",
      textAlign: isRTL ? "right" : "left",
    },
    skillsContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 6,
    },
    skillBadge: {
      backgroundColor: accentColor,
      color: "#FFFFFF",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      fontSize: 9,
    },
    languagesContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 8,
    },
    languageItem: {
      fontSize: 10,
      color: "#374151",
      textAlign: isRTL ? "right" : "left",
    },
  });

// Labels
const labels = {
  en: {
    summary: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    languages: "Languages",
    present: "Present",
  },
  ar: {
    summary: "نبذة مهنية",
    experience: "الخبرات العملية",
    education: "التعليم",
    skills: "المهارات",
    languages: "اللغات",
    present: "حتى الآن",
  },
};

interface CVDocumentProps {
  data: CVData;
}

export function CVDocument({ data }: CVDocumentProps) {
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
                  <Text style={styles.contactItem}>📧 {data.email}</Text>
                )}
                {phoneDisplay && (
                  <Text style={styles.contactItem}>📱 {phoneDisplay}</Text>
                )}
                {data.location && (
                  <Text style={styles.contactItem}>📍 {data.location}</Text>
                )}
                {data.website && (
                  <Link src={data.website} style={styles.contactLink}>
                    🌐 {data.website.replace(/^https?:\/\//, "")}
                  </Link>
                )}
                {data.linkedin && (
                  <Link src={data.linkedin} style={styles.contactLink}>
                    💼 LinkedIn
                  </Link>
                )}
                {data.github && (
                  <Link src={data.github} style={styles.contactLink}>
                    💻 GitHub
                  </Link>
                )}
              </View>
            </View>
            {data.photoUrl && !data.photoUrl.startsWith("data:") && (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={data.photoUrl} style={styles.photo} />
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
                <Text key={skill.id} style={styles.skillBadge}>
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
              {data.languages.map((lang, index) => (
                <Text key={lang.id} style={styles.languageItem}>
                  {lang.name} ({lang.proficiency})
                  {index < data.languages.length - 1 ? " • " : ""}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
