export $(printf "AWS_ACCESS_KEY_ID=%s AWS_SECRET_ACCESS_KEY=%s AWS_SESSION_TOKEN=%s" \
$(aws sts assume-role \
--role-arn arn:aws:iam::${AWS_ACCOUNT_ID}:role/${AWS_ROLE} \
--role-session-name ${AWS_ROLE} \
--query "Credentials.[AccessKeyId,SecretAccessKey,SessionToken]" \
--output text))

sam validate
